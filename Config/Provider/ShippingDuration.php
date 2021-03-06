<?php
/**
 *
 *          ..::..
 *     ..::::::::::::..
 *   ::'''''':''::'''''::
 *   ::..  ..:  :  ....::
 *   ::::  :::  :  :   ::
 *   ::::  :::  :  ''' ::
 *   ::::..:::..::.....::
 *     ''::::::::::::''
 *          ''::''
 *
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Creative Commons License.
 * It is available through the world-wide-web at this URL:
 * http://creativecommons.org/licenses/by-nc-nd/3.0/nl/deed.en_US
 * If you are unable to obtain it through the world-wide-web, please send an email
 * to servicedesk@tig.nl so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize this module for your
 * needs please contact servicedesk@tig.nl for more information.
 *
 * @copyright   Copyright (c) Total Internet Group B.V. https://tig.nl/copyright
 * @license     http://creativecommons.org/licenses/by-nc-nd/3.0/nl/deed.en_US
 */
namespace TIG\PostNL\Config\Provider;

use Magento\Eav\Model\Entity\Attribute\Source\AbstractSource;

class ShippingDuration extends AbstractSource
{
    const CONFIGURATION_VALUE = 'default';
    /**
     * @return array
     */
    public function getAllOptions()
    {
        $options[] = [
            'value' => static::CONFIGURATION_VALUE,
            // @codingStandardsIgnoreLine
            'label' => __('Use configuration value')
        ];

        foreach (range(0, 14) as $day) {
            $options[] = [
                'value' => $day,
                'label' => $this->getLabel($day)
            ];
        }

        return $options;
    }

    /**
     * @param $day
     *
     * @return \Magento\Framework\Phrase
     */
    private function getLabel($day)
    {
        if ($day == 1) {
            // @codingStandardsIgnoreLine
            return __('%1 Day', $day);
        }

        // @codingStandardsIgnoreLine
        return __('%1 Days', $day);
    }
}
